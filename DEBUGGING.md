# Debugging Guide

This document explains how to troubleshoot the social media application using the enhanced logging system.

## Starting the Server

1. Open PowerShell in the `d:\visual\` directory
2. Run: `npm start`
3. You should see output like:
   ```
   [SERVER] Express server initialized
   [SERVER] Server running at http://localhost:3000
   [SERVER] Posts file: d:\visual\posts.json
   ```

## Understanding Server Logs

When the server is running, watch for these log prefixes:

### GET Request (Load Posts)
```
[GET] /api/posts - Fetching all posts
[SUCCESS] Returning 5 posts from database
```

### POST Request (Create Post)
```
[POST] /api/posts - New post
[SUCCESS] Post created with id: <uuid>
[SUCCESS] Total posts now: 6
```

### PUT Request (Update Post)
```
[PUT] /api/posts/<uuid> - Updating post
[SUCCESS] Post updated: <uuid>
```

### DELETE Request (Delete Post)
```
[DELETE] /api/posts/<uuid> - Deleting post
[SUCCESS] Post deleted: <uuid>
[SUCCESS] Total posts now: 4
```

### Error Messages
```
[ERROR] Failed to save posts to file: <error details>
[ERROR] Post not found: <uuid>
```

## Understanding Client Logs

Open the browser console (F12) on any page to see client-side logs:

### Loading Posts
```
[CLIENT] Loading posts from server...
[CLIENT] GET /api/posts response status: 200
[CLIENT] Received 5 posts from server
```

### Creating a Post
```
[CLIENT] Starting post submission...
[CLIENT] Is Edit: false
[CLIENT] Post data size: 1234567 bytes
[CLIENT] Creating new post
[CLIENT] Response status: 200 OK
[CLIENT] Success! Response: {id: "...", ...}
```

### Editing a Post
```
[CLIENT] Starting post submission...
[CLIENT] Is Edit: true
[CLIENT] Updating post with id: <uuid>
[CLIENT] Response status: 200 OK
```

### Deleting a Post
```
[CLIENT] Deleting post: <uuid>
[CLIENT] DELETE response status: 200
[CLIENT] Post deleted successfully
```

## Common Issues and Solutions

### Issue: "Cannot connect to server"
- **Server logs show**: Nothing (server not running)
- **Client logs show**: Connection error
- **Solution**: 
  1. Make sure server is running (`npm start`)
  2. Check that it says "Server running at http://localhost:3000"
  3. Verify no other service is using port 3000

### Issue: "Server error 500" appears
- **Server logs show**: `[ERROR] Failed to save posts to file`
- **Client logs show**: Error details
- **Solution**:
  1. Check that `posts.json` exists in `d:\visual\`
  2. Verify you have write permissions to the directory
  3. Restart the server

### Issue: Post not showing after creation
- **Server logs show**: `[SUCCESS] Post created`
- **Client logs show**: `[SUCCESS] Response`
- **Solution**:
  1. Manually refresh the page (F5)
  2. Check browser console for GET errors
  3. Verify `posts.json` contains the new post (view with text editor)

### Issue: Cannot delete post
- **Server logs show**: `[ERROR] Post not found`
- **Client logs show**: Delete error
- **Solution**:
  1. Refresh the page to reload post list
  2. Check that the post ID is correct in `posts.json`
  3. Restart server if posts.json seems corrupted

## Viewing the Raw Data

To see all posts stored on the server:
1. Open `d:\visual\posts.json` in a text editor
2. You should see a JSON array: `[{id: "...", ...}, ...]`
3. If corrupted, you can clear it and start fresh: `[]`

## Testing Checklist

1. **Server startup**
   - [ ] Run `npm start` in `d:\visual\`
   - [ ] See "Server running at http://localhost:3000"

2. **Create post**
   - [ ] Open `http://localhost:3000/index.html`
   - [ ] Go to Files and Description
   - [ ] Add description and submit
   - [ ] See "[SUCCESS] Post created" in server logs
   - [ ] See new post on Home feed after refresh

3. **Edit post**
   - [ ] Click 3-dot menu on any post
   - [ ] Click Edit
   - [ ] Modify description
   - [ ] Submit
   - [ ] See "[SUCCESS] Post updated" in server logs

4. **Delete post**
   - [ ] Click 3-dot menu on any post
   - [ ] Click Delete
   - [ ] Confirm deletion
   - [ ] See "[SUCCESS] Post deleted" in server logs

## Performance Notes

- Image resize: Happens client-side, takes 1-2 seconds for large images
- Video transcode: Attempts WebM format (may not work in all browsers)
- Data URLs: Large files (multiple MB) can be slow to process
- Browser console: Keep F12 open during testing to catch errors

## Advanced: Manual API Testing

You can test the API directly using PowerShell:

```powershell
# Get all posts
(Invoke-WebRequest -Uri "http://localhost:3000/api/posts" -Method GET).Content

# Health check
(Invoke-WebRequest -Uri "http://localhost:3000/api/health" -Method GET).Content
```

## Getting Help

When reporting issues:
1. Include the full error message from server logs (with [TAG] prefix)
2. Include the full error message from browser console (F12)
3. State what action triggered the error (create, edit, delete, load)
4. Include your browser name and version
