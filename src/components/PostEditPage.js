import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useHistory, useParams } from 'react-router-dom';
import PostManipulation from './PostManipulation/PostManipulation';

export default function PostEditPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const request = axios.get(`http://localhost:4001/posts/${postId}`); //pegar o post
    request.then(r => {
      const serverPost = r.data;
      setTitle(serverPost.title);
      setCoverUrl(serverPost.coverUrl);
      setContent(serverPost.content);
      setPost(serverPost);
    });
  }, [postId]);

  function onPostSaveButtonClick() {
    setSaveButtonDisable(true);
    const body = {
      id: post.id,
      title,
      coverUrl,
      content,
      commentCount: post.commentCount
    }
    const request = axios.put(`http://localhost:4001/posts/${postId}`, body);
    request.then(r => {
      setSaveButtonDisable(false);
      history.push('');
    });
    request.catch(() => {
      alert('algo deu errado');
      setSaveButtonDisable(false)
    });
  }

  if (!post || !content) return <Spinner />;

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      isSaveButtonDisabled={isSaveButtonDisabled}
      postId={postId}
    />
  );
}
