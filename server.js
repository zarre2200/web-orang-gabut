const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Listen on all interfaces
const DATA_FILE = path.join(__dirname, 'posts.json');

console.log('[SERVER] Starting server...');
console.log('[SERVER] Data file path:', DATA_FILE);

// Get local IP addresses for network access
function getLocalIPs() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  
  return ips;
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(__dirname));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toLocaleString() });
});

// Helper: Read posts from file
function readPosts() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('[ERROR] Reading posts:', err.message);
  }
  return [];
}

// Helper: Write posts to file
function writePosts(posts) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
    console.log('[SUCCESS] Posts saved. Count:', posts.length);
    return true;
  } catch (err) {
    console.error('[ERROR] Writing posts:', err.message);
    return false;
  }
}

// GET all posts
app.get('/api/posts', (req, res) => {
  console.log('[GET] /api/posts');
  const posts = readPosts();
  console.log('[RESPONSE] Returning', posts.length, 'posts');
  res.json(posts);
});

// POST new post
app.post('/api/posts', (req, res) => {
  console.log('[POST] /api/posts - New post');
  const post = req.body;
  post.id = Date.now();
  post.timestamp = new Date().toLocaleString();
  
  const posts = readPosts();
  posts.unshift(post);
  
  if (writePosts(posts)) {
    console.log('[SUCCESS] Post created with id:', post.id);
    res.json({ success: true, post });
  } else {
    console.log('[ERROR] Failed to save new post');
    res.status(500).json({ success: false, message: 'Failed to save post' });
  }
});

// UPDATE post (by id)
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  console.log('[PUT] /api/posts/' + postId);
  const updatedData = req.body;
  
  const posts = readPosts();
  const index = posts.findIndex(p => p.id === postId);
  
  if (index >= 0) {
    posts[index] = { ...posts[index], ...updatedData, timestamp: new Date().toLocaleString() };
    if (writePosts(posts)) {
      console.log('[SUCCESS] Post', postId, 'updated');
      res.json({ success: true, post: posts[index] });
    } else {
      console.log('[ERROR] Failed to update post', postId);
      res.status(500).json({ success: false, message: 'Failed to update post' });
    }
  } else {
    console.log('[ERROR] Post not found:', postId);
    res.status(404).json({ success: false, message: 'Post not found' });
  }
});

// DELETE post (by id)
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  console.log('[DELETE] /api/posts/' + postId);
  const posts = readPosts();
  const filtered = posts.filter(p => p.id !== postId);
  
  if (filtered.length < posts.length) {
    if (writePosts(filtered)) {
      console.log('[SUCCESS] Post', postId, 'deleted');
      res.json({ success: true, message: 'Post deleted' });
    } else {
      console.log('[ERROR] Failed to delete post', postId);
      res.status(500).json({ success: false, message: 'Failed to delete post' });
    }
  } else {
    console.log('[ERROR] Post not found for delete:', postId);
    res.status(404).json({ success: false, message: 'Post not found' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[ERROR] Unhandled error:', err.message);
  res.status(500).json({ success: false, message: err.message });
});

// Start server on all network interfaces
app.listen(PORT, HOST, () => {
  const localIPs = getLocalIPs();
  
  console.log('\n========================================');
  console.log('[✓] SERVER STARTED');
  console.log('========================================');
  console.log('[✓] Local access (this machine):');
  console.log('    http://localhost:' + PORT + '/index.html');
  console.log('    http://127.0.0.1:' + PORT + '/index.html');
  
  if (localIPs.length > 0) {
    console.log('[✓] Network access (other devices):');
    localIPs.forEach(ip => {
      console.log('    http://' + ip + ':' + PORT + '/index.html');
    });
  } else {
    console.log('[!] No network IP found. Connect from other devices using:');
    console.log('    http://<your-computer-ip>:' + PORT + '/index.html');
  }
  
  console.log('[✓] Posts file: ' + DATA_FILE);
  console.log('========================================\n');
  console.log('[INFO] To connect from another device:');
  console.log('  1. Make sure both devices are on the same network');
  console.log('  2. Use one of the network URLs above');
  console.log('  3. Replace <hostname> with the actual IP address\n');
});
