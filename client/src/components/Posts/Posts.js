import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core';
import {getPosts} from '../../actions/posts';

import Post from './Post/Post';
import useStyles from './styles';


const Posts = ({setCurrentId}) => {
const {posts, isLoading} = useSelector((state) => state.posts)

const classes = useStyles();





if (!posts?.length && !isLoading) return 'No posts';



    return (
     isLoading ? <CircularProgress /> : (

      <Grid className = {classes.container} container alignItems="stretch" spacing = {3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} lg={3}>
            <Post post={post} setCurrentId = {setCurrentId}/>

          </Grid>
        ))}

      </Grid>
     )

    );
};

export default Posts;