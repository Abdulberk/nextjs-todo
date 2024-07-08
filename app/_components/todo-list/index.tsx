'use client';
import React, { forwardRef } from 'react';
import { Grid, Paper, Typography, Checkbox, FormControlLabel, Button, List, ListItem,Skeleton } from '@mui/material';
import { UpdateTodo } from '@/app/_interfaces/update-todo.interface';
import { Todo } from '@/app/_interfaces/todo.interface';
import { Status } from '@/app/_enums/todo-status.enum';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AnimatePresence, motion,useMotionValue, useTransform, } from 'framer-motion';
import { Reorder } from "framer-motion"
import { useTodoStore } from '@/app/_stores/useTodo';


interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number | string, updatedTodo: UpdateTodo) => void;
  onDelete: (id: number | string) => void;
  handleEdit: (id: number | string) => void;
  index: number
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete, handleEdit,index }) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleCheckboxChange = (id: number | string, status: Status) => {
    const updatedTodo: UpdateTodo = { status };
    onUpdate(id, updatedTodo);
  };


  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 150) {
      onDelete(todo.id);
    }
  };

  return (
    <Reorder.Item value={todo} id={String(todo.id)}>
    <motion.li key={todo.id}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: 200, transition: { duration: 0.3 } }}
    transition={{ type: "spring", stiffness: 150, damping: 50, duration: 0.5,delay: index * 0.1, ease: "easeInOut" }}
    drag="x"
    style={{ x, opacity }}
    onDragEnd={handleDragEnd}
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    dragElastic={1}
    dragMomentum={true}
    whileTap={{ scale: 0.95, cursor: "grabbing" }}


      
    >
      <ListItem divider alignItems="center" style={{ backgroundColor: '#f2f2f2', padding: '10px', border: 'none' }}>
        <Checkbox
          sx={{
            color: "#48d9b7",
            '&.Mui-checked': {
              color: "#48d9b7",
            },
          }}
          size='large'
          checked={todo.status === Status.COMPLETED}
          onClick={() => handleCheckboxChange(todo.id, todo.status === Status.COMPLETED ? Status.PENDING : Status.COMPLETED)}
        /><Typography
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
    </motion.li>
    </Reorder.Item>
  );
};




interface TodoListProps {

  handleEdit: (id: number | string) => void;
  handleUpdateTodo: (id: number | string, updatedTodo: UpdateTodo) => void;
  handleDeleteTodo: (id: number | string) => void;
}


const TodoList: React.FC<TodoListProps> = ({ handleEdit, handleUpdateTodo, handleDeleteTodo }) => {
  const { todos, setTodos} = useTodoStore();

  return (
    <Reorder.Group axis="y" onReorder={setTodos} values={todos}>
      <Grid container direction="column" spacing={2}>
        <AnimatePresence mode="popLayout">
          {todos?.map((todo, index) => (
            <Grid item xs={12} key={todo.id}>
              <TodoItem todo={todo} onUpdate={handleUpdateTodo} onDelete={handleDeleteTodo} handleEdit={handleEdit} index= {index} />
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Reorder.Group>
  );
};

export default TodoList;
