import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Comment from './Comment';
import AddComment from './AddComment';

export default function PostComments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments([{
      id: 1,
      postId: postId,
      author: 'João',
      content: 'Muito bom esse post! Tá de parabéns'
    }, {
      id: 2,
      postId: postId,
      author: 'Maria',
      content: 'Como faz pra dar palmas?'
    }])
  }, [postId]);
  
  return (
    <Container>
      <Title>Comments</Title>
      {
        comments.length > 0
         ? comments.map(c => <Comment comment={c} key={c.id} />)
         : "No comments yet. Be the first to comment!"
      }
      <AddComment postId={postId} />
    </Container>
  );
}

const Title = styled.h1`
  font-size: 1.6em;
  border-bottom: 1px solid var(--color-devider-light_gray);
  padding-bottom: 10px;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px 40px;
  max-width: 740px;
  font-family: 'Merriweather', serif;
  font-size: 18px;
  line-height: 1.58;
  letter-spacing: -0.004em;
`;
