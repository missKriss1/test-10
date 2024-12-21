import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks.ts';
import { INewsMutation } from '../../types';
import { addNews, fetchAllNews } from '../newsThunk.ts';
import AddForm from '../components/AddForm.tsx';

const NewNews = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formSubmit = async (news: INewsMutation) =>{
    await dispatch(addNews(news));
    await dispatch(fetchAllNews());
    navigate('/')
  }
  return (
    <div>
      <AddForm onSubmit={formSubmit}/>
    </div>
  );
};

export default NewNews;