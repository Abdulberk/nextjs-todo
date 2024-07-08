'use client';
import React, { useEffect, useState,useMemo } from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import TodoList from './_components/todo-list';
import { useGetTodosQuery } from './_hooks/useGetTodosQuery';
import { useUpdateTodoMutation } from './_hooks/useUpdateTodoMutation';
import { useDeleteTodoMutation } from './_hooks/useDeleteTodoMutation';
import { useCreateTodoMutation } from './_hooks/useCreateTodoMutation';
import { CreateTodo } from './_interfaces/create-todo.interface';
import { UpdateTodo } from './_interfaces/update-todo.interface';
import { Todo } from './_interfaces/todo.interface';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { showErrorToast,showSuccessToast,showPromiseToast  } from './_helpers/toast-helper';
import { ToastContainer,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTodoStore } from './_stores/useTodo';
import Spinner from './_components/spinner';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useInView } from 'react-intersection-observer';
import { DropResult } from 'react-beautiful-dnd';

const ITEMS_PER_PAGE = 10;
const Home: React.FC = () => {
  const { data: todos, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTodosQuery({ limit: ITEMS_PER_PAGE });
  const [ref, inView] = useInView();
  
  const updateTodoMutation = useUpdateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();
  const createTodoMutation = useCreateTodoMutation();
  const {
    newTodo,
    isEdited,
    editId,
    isFocused,
    hasInput,
    setTodos,
    setNewTodo,
    setIsEdited,
    setEditId,
    setIsFocused,
    setHasInput,
    resetNewTodo,
    addTodo,
    updateTodo,
    deleteTodo,
  } = useTodoStore();
  

  const allTodos = useMemo(() => {
    return todos?.pages.flatMap(page => page.todos) || [];
}, [todos]);

const sortedTodos = useMemo(() => {
    return [...allTodos].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}, [allTodos]);

  useEffect(() => {
    if (inView && hasNextPage) {
        fetchNextPage();
    }
}, [inView, hasNextPage, fetchNextPage]);

useEffect(() => {
  if (todos) {
      const allTodos = todos.pages.flatMap(page => page.todos);
      setTodos(allTodos);
  }
}, [todos, setTodos]);

const handleCreateTodo = () => {
  const createPromise = isEdited && editId
    ? updateTodoMutation.mutateAsync({ id: editId, updatedTodo: { title: newTodo.title, description: newTodo.description } })
    : createTodoMutation.mutateAsync(newTodo);

  showPromiseToast(
    createPromise,
    {
      pending: isEdited ? 'Updating todo...' : 'Creating new todo...',
      success: isEdited ? `Todo ${editId} updated successfully` : 'Todo created successfully',
      error: error?.message || 'Error creating todo'
    }
  );

  setNewTodo({ title: '', description: '' });
  setIsEdited(false);
  setEditId(null);
  setIsFocused(false);
  setHasInput(false);
};


  const handleUpdateTodo = (id: string | number, updatedTodo: UpdateTodo) => {
    showPromiseToast(
      updateTodoMutation.mutateAsync({ id, updatedTodo }),
      {
        pending: 'Updating todo...',
        success: `Todo ${id} updated successfully`,
        error: error?.message || 'Error updating todo'
      }
    );

    setIsEdited(false);
    setEditId(null);
    setIsFocused(false);
    setHasInput(false);


  };

  const handleEdit = (id: number | string) => {
    const todo = sortedTodos.find((todo) => todo.id === id);
    if (todo) {
      setNewTodo({ title: todo.title, description: todo.description });
      setIsEdited(true);
      setEditId(id);
      setIsFocused(true);
    }
  };

  const handleDeleteTodo = (id: number | string) => {
    showPromiseToast(
      deleteTodoMutation.mutateAsync(id),
      {
        pending: 'Deleting todo...',
        success: `Todo ${id} deleted successfully`,
        error: error?.message || 'Error deleting todo'
      }
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, title: e.target.value });
    if (e.target.value) {
      setHasInput(true);
    } else {
      setHasInput(false);
    }
  };

  if (isLoading) {
    return <Spinner />
  }
  if (error) return 


  return (
    <main>
    <Grid container justifyContent="center" alignItems="flex-start" height={"100vh"}>
      <Grid item xs={12} md={8} lg={6}>
        <Container component="main" style={{ textAlign: 'center', borderRadius: "12px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", background: "white", padding: "20px" }}>
          <Grid container justifyContent="center" alignItems="center" >
          <Typography  variant="h5" component="div" align="center" gutterBottom>
            Todo App
          </Typography>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={hasInput ? 9 : 12} style={{ transition: 'all 0.3s' }}>
              <TextField
                variant="outlined"
                onChange={onChange}
                label={isEdited ? "Edit Task" : "Add Task"}
                value={newTodo.title}
                fullWidth
                onFocus={() => setIsFocused(true)}
                onBlur={() => !newTodo.title && setIsFocused(false)}
                InputProps={{
                  style: {
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                    fontSize: '16px',
                    color: 'rgba(0, 0, 0, 0.87)',
                  }
                }}
                InputLabelProps={{
                  style: {
                    color: 'rgba(0, 0, 0, 0.54)',
                    fontWeight: '500',
                    fontSize: '16px',
                  }
                }}
              />
            </Grid>
            
            {hasInput && (
              <Grid item xs={3} style={{ transition: 'all 0.3s' }}>
                <Button
                  style={{ height: '56px', width: '100%' }}
                  variant={isEdited ? "outlined" : "contained"}
                  color="primary"
                  onClick={handleCreateTodo}
                  disabled={!newTodo.title}
                  startIcon={isEdited ? <EditIcon /> : <AddIcon />} 

                >
                  {isEdited ? "Edit Task" : "Add Task"}
                </Button>
              </Grid>
            )}
          </Grid>
          <Box mt={4}>
          {sortedTodos.length > 0 ? <TodoList handleEdit={handleEdit} handleUpdateTodo={handleUpdateTodo} handleDeleteTodo={handleDeleteTodo} /> : <Skeleton count={5} width={900} height={64} borderRadius={"12px"} style={{ marginBottom: "0.5rem" }} />}
                            {sortedTodos.length === 0 && <p style={{ textAlign: "center" }}>No todos found</p>}
          </Box>
            
          <div ref={ref} />
          {isFetchingNextPage && <Spinner />}

        </Container>
      </Grid>
    </Grid>
    
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
  </main>
  );
};

export default Home;