import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import zaglushka from '/src/assets/zaglushka.png';
import { apiUrl } from '../../globalConstant.ts';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectNewsDelete } from '../newsSlice.ts';
import { deleteOneNews, fetchAllNews } from '../newsThunk.ts';
import LoadingButton from '@mui/lab/LoadingButton';
import dayjs from 'dayjs';

interface Props {
  id: string;
  title: string;
  description: string;
  image: string | null | undefined;
  date: string;
}

const NewsItem: React.FC<Props> = ({ title, description, image, id, date }) => {
  const dispatch = useAppDispatch();
  const deleteNews = useAppSelector(selectNewsDelete);

  const onDelete = async (id: string) => {
    await dispatch(deleteOneNews(id));
    await dispatch(fetchAllNews());
  };

  let imageZaglushka = zaglushka;

  if (image) {
    imageZaglushka = `${apiUrl}/${image}`;
  }

  return (
    <Card
      sx={{
        display: 'flex',
        width: '100%',
        maxWidth: '100%',
        marginBottom: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 200,
          height: 200,
          objectFit: 'cover',
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}
        image={imageZaglushka}
        alt={title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, flex: 1 }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {dayjs(date).format('YYYY-MM-DD HH:mm:ss')}
          </Typography>
        </CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <NavLink to={`/news/${id}`} style={{ textDecoration: 'none' }}>
            <Button size="small" variant="contained" color="primary">
              Read Full Post
            </Button>
          </NavLink>

          <LoadingButton loading={deleteNews} color="error" onClick={() => onDelete(id)}>
            Delete
          </LoadingButton>
        </Box>
      </Box>
    </Card>
  );
};

export default NewsItem;
