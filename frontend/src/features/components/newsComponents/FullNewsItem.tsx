import { INews } from '../../../types';
import * as React from 'react';
import { Box, Typography, CardMedia, Card } from '@mui/material';
import dayjs from 'dayjs';

interface Props {
  news: INews;
}

const FullNewsItem: React.FC<Props> = ({ news }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        height: 300,
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {news.image && (
        <CardMedia
          component="img"
          sx={{
            width: 300,
            height: 300,
            objectFit: 'cover',
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
          image={`http://localhost:8000/${news.image}`}
          alt={news.title}
        />
      )}

      <Box
        sx={{
          flex: 1,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {news.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            opacity: 0.7,
            marginBottom: '30px',
            fontSize: '1rem',
          }}
        >
          {dayjs(news.date).format('YYYY-MM-DD HH:mm:ss')}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.2rem',
            marginBottom: '30px',
          }}
        >
          {news.description}
        </Typography>
      </Box>
    </Card>
  );
};

export default FullNewsItem;
