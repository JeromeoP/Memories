import {FETCH_ALL, CREATE, FETCH_POST, START_LOADING, END_LOADING, UPDATE, DELETE, FETCH_BY_SEARCH} from '../constants/actionTypes';
import * as api from '../api';

const user = JSON.parse(localStorage.getItem('profile'));


// Action Creators
export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: { post: data } });
      dispatch({ type: END_LOADING });

    } catch (error) {
      console.log(error);
    }
  };



export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPosts(page);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING});

    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data: {data}} = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.createPost(post);
        navigate(`/posts/${data._id}`);

        dispatch({type: CREATE, payload: data});
        dispatch({type: END_LOADING});

        
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        if ( user?.result.googleId === post?.creator || user?.result?._id === post?.creator) {
            const {data} = await api.updatePost(id, post);
    
            dispatch({type: UPDATE, payload: data});
           } else {
               console.log("This is not your post.")
           }
        
    } catch (error) {
        console.log(error);
        
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
        
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);

        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
        
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
         const { data } = await api.comment(value, id);
         console.log(data);
    } catch (error) {
        console.log(error);

    }
}