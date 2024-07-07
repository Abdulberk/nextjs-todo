'use client';
import React from 'react';
import { Grid, Paper, Typography, Checkbox, FormControlLabel, Button, List, ListItem,Skeleton } from '@mui/material';
import { UpdateTodo } from '@/app/_interfaces/update-todo.interface';
import { Todo } from '@/app/_interfaces/todo.interface';
import { Status } from '@/app/_enums/todo-status.enum';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number | string, updatedTodo: UpdateTodo) => void;
  onDelete: (id: number | string) => void;
  handleEdit: (id: number | string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete, handleEdit }) => {

  
  const handleCheckboxChange = (id: number | string, status: Status) => {
    const updatedTodo: UpdateTodo = { status };
    onUpdate(id, updatedTodo);
  };



  return (
    <ListItem divider alignItems="center" style = {{backgroundColor: '#f2f2f2', padding: '10px', border: 'none'
    }}>
      <Checkbox
      sx={{
        color: "pink",
        '&.Mui-checked': {
        color: "#48d9b7",
         },
       }}
      size='large'
        checked={todo.status === Status.COMPLETED}
        onClick={() => handleCheckboxChange(todo.id, todo.status === Status.COMPLETED ? Status.PENDING : Status.COMPLETED)}
      />
      <Typography
        style={{ 
          color: todo.status === Status.COMPLETED ? "#48d9b7" : "",
          textDecoration: todo.status === Status.COMPLETED ? "line-through" : "none",
          transition: "color 0.3s ease",
        }}
        key={todo.id}
      >
        {todo.title}
      </Typography>
      <Button onClick={() => handleEdit(todo.id)} variant="contained" startIcon={<EditIcon />}>
        Edit
      </Button>
      <Button onClick={() => onDelete(todo.id)} color="secondary" variant="contained" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </ListItem>

  );
};




interface TodoListProps {
  todos: Todo[] | undefined;
  onUpdate: (id: number | string, updatedTodo: UpdateTodo) => void;
  onDelete: (id: number | string) => void;
  handleEdit: (id: number | string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete, handleEdit }) => {
  return (
   
    <Grid container direction="column" spacing={2}>
      
      {todos?.map((todo) => (
          

        <Grid item xs={12} key={todo.id}>
       
          <TodoItem todo={todo} onUpdate={onUpdate} onDelete={onDelete} handleEdit={handleEdit} />
          
        </Grid>

      ))}
     
    </Grid>
    
  );
};

export default TodoList;
