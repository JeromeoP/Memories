import React, {useState, useEffect} from 'react';
import useStyles from './styles';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector } from 'react-redux';
import {createPost, updatePost} from '../../actions/posts';
import { useNavigate} from 'react-router-dom';



const Form = ({ currentId, setCurrentId}) => {
const navigate = useNavigate();

const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
});

const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null );


    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
      if(post) setPostData(post);
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
      if(currentId === 0) {
        dispatch(updatePost(currentId, {... postData, name: user?.result?.name}));
      } else {
        dispatch(createPost({... postData, name: user?.result?.name}, navigate)); 
      }
      clear();

    }

    if(!user?.result.name) {
      return(
        <Paper className = {classes.paper}>
          <Typography variant = "h6" align = "center">
            Please sign in to create your own memories and like others memories!
          </Typography>

        </Paper>
      )
    }
    const clear = () => {
      setCurrentId(null);
      setPostData({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
        
    }

    return (
        <Paper className={classes.paper} elevation = {6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} a Memory</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained"  color = "inherit" size="large" type="submit" fullWidth>Submit</Button>
        <Button className = {classes.buttonClear} variant="contained" color = "inherit" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
        );
};

export default Form;