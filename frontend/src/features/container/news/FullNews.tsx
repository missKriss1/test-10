import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectNew, selectNewsFetchOne } from './newsSlice.ts';
import { useEffect } from 'react';
import { fetchOneNew } from './newsThunk.ts';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/Spinner.tsx';
import FullNewsItem from '../../components/newsComponents/FullNewsItem.tsx';
import { Typography, Box, Card, IconButton } from '@mui/material';
import FormAddComment from '../../components/commentComponents/FormAddComment.tsx';
import { fetchCommentByNewsId } from '../comment/commentThunk.ts';
import { selectComment } from '../comment/commentSlice.ts';

const FullNews = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNew);
  const newsFetch = useAppSelector(selectNewsFetchOne);
  const comments = useAppSelector(selectComment);

  useEffect(() => {
    dispatch(fetchOneNew(id));
    dispatch(fetchCommentByNewsId(id));
  }, [dispatch, id]);

  const

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ flex: 1, overflowY: 'auto', paddingBottom: '70px' }}>
        {newsFetch ? (
          <Spinner />
        ) : (
          <>
            {news ? (
              <FullNewsItem news={news} />
            ) : (
              <Typography variant="h6" component="h2">
                No posts available
              </Typography>
            )}

            {comments.length > 0 ? (
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h3" component="h2" sx={{ marginBottom: 2 }}>
                  Comments
                </Typography>
                {comments.map((comment) => (
                  <Card
                    key={comment.id}
                    sx={{
                      display: 'flex',
                      height: 100,
                      boxShadow: 3,
                      borderRadius: 2,
                      overflow: 'hidden',
                      marginBottom: 2,
                      flexDirection: 'row',
                    }}
                  >
                    <Box
                      sx={{
                        flex: '0 0 auto',
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h4" component="h2" gutterBottom>
                        {comment.author}:
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        flex: 1,
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '1.2rem',
                        }}
                      >
                        {comment.comment}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        paddingRight: 2,
                        paddingTop: 2,
                      }}
                    >
                      <IconButton
                        sx={{ width: 100 }}
                      >
                        Delete
                      </IconButton>
                    </Box>
                  </Card>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}
          </>
        )}
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          padding: 2,
          backgroundColor: '#fff',
          boxShadow: 2,
        }}
      >
        <FormAddComment newsId={id} />
      </Box>
    </Box>
  );
};

export default FullNews;
