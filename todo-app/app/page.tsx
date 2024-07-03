'use client';
import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button,Grid,Box } from '@mui/material';
import TodoList from './_components/todo-list';
import { useGetTodoQuery } from './_hooks/useGetTodoQuery';
import { useGetTodosQuery } from './_hooks/useGetTodosQuery';
import { useUpdateTodoMutation } from './_hooks/useUpdateTodoMutation';
import { useDeleteTodoMutation } from './_hooks/useDeleteTodoMutation';
import { useCreateTodoMutation } from './_hooks/useCreateTodoMutation';
import { CreateTodo } from './_interfaces/create-todo.interface';
import { UpdateTodo } from './_interfaces/update-todo.interface';
import { Todo } from './_interfaces/todo.interface';





const Home: React.FC = () => {
  const { data: todos, isLoading, error } = useGetTodosQuery();
  
  const updateTodoMutation = useUpdateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();
  const createTodoMutation = useCreateTodoMutation();

  const [newTodo, setNewTodo] = useState<CreateTodo>({ title: '', description: '' });
  const [isMounted, setIsMounted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [editId, setEditId] = useState<number | string | null>(null);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (todos) {
   
      const sorted = [...todos].sort((a, b) => (new Date(a.createdAt)).getTime() - (new Date(b.createdAt)).getTime());
      setSortedTodos(sorted);
    }
  }, [todos]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleCreateTodo = () => {
    if (isEdited && editId) {
      const updatedTodo: UpdateTodo = { title: newTodo.title, description: newTodo.description };
      updateTodoMutation.mutateAsync({ id: editId, updatedTodo })
        .then(() => {
          setNewTodo({ title: '', description: '' });
          setIsEdited(false);
          setEditId(null);
        })
        .catch((err) => console.log(err));
    } else {
      createTodoMutation.mutateAsync(newTodo)
        .then(() => setNewTodo({ title: '', description: '' }))
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateTodo = (id: string | number, updatedTodo: UpdateTodo) => {
    updateTodoMutation.mutateAsync({ id, updatedTodo })
      .catch((err) => console.log(err));
  };


  const handleEdit = (id: number | string) => {
    const todo = sortedTodos.find((todo) => todo.id === id);
    if (todo) {
      setNewTodo({ title: todo.title, description: todo.description });
      setIsEdited(true);
      setEditId(id);
    }
  };

  const handleDeleteTodo = (id: number | string) => {
    deleteTodoMutation.mutate(id);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, title: e.target.value });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred</div>;
  if (!isMounted) return null;
  return (
    
      <main>
       <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Container component="main" style={{ textAlign: 'center', borderRadius: "12px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", background: "white", padding: "20px" }}>
            <Typography variant="h5" component="div" align="center" gutterBottom style={{ marginBottom: '20px' }}>
              Todo App
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <TextField
                  variant="outlined"
                  onChange={onChange}
                  label="Add Todo"
                  value={newTodo.title}
                  fullWidth
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
              <Grid item xs={3}>
                <Button
                  style={{ height: '56px', width: '100%' }}
                  variant={isEdited ? "outlined" : "contained"}
                  color="primary"
                  onClick={handleCreateTodo}
                  disabled={!newTodo.title}
                >
                  {isEdited ? "Edit Task" : "Add Task"}
                </Button>
              </Grid>
            </Grid>
            <Box mt={4}>
              <TodoList todos={sortedTodos} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} handleEdit={handleEdit} />
            </Box>
          </Container>
        </Grid>
      </Grid>
      </main>
    
  );
};

export default Home;
