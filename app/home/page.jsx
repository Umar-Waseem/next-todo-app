"use client"



import React, { useState, useEffect } from 'react';

import Loader from '../components/Loader';
import IconButton from '../components/IconButton';

const BASE_URL = 'http://localhost:8000';

export default function Home() {


    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [editingTodoId, setEditingTodoId] = useState(-1);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingDescription, setEditingDescription] = useState('');

    const [loading, setLoading] = useState(false);
    const [addItemLoading, setAddItemLoading] = useState(false);



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }

        // Fetch todos from the API
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${BASE_URL}/todos`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setTodos(data);
                } else {
                    console.error('Unable to fetch todos');
                }
            } catch (error) {
                console.error('Unable to fetch todos:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTodos();
    }, []);

    const handleInputChange = (e) => {
        setNewTodo({
            ...newTodo,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddTodo = async () => {
        try {
            setAddItemLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newTodo),
            });


            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTodos([...todos, data]);
                setNewTodo({ title: '', description: '' });
            } else {
                console.error('Unable to add todo');
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
        finally {
            setAddItemLoading(false);
        }
    };

    const handleUpdateTodo = (id) => {
        const todoToUpdate = todos.find((todo) => todo.id === id);
        setEditingTodoId(id);
        setEditingTitle(todoToUpdate.title);
        setEditingDescription(todoToUpdate.description);
    };

    const handleSaveTodo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/todos/${editingTodoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: editingTitle, description: editingDescription }),
            });

            if (response.ok) {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) => (todo.id === editingTodoId ? { ...todo, title: editingTitle, description: editingDescription } : todo))
                );
                setEditingTodoId(null);
                setEditingTitle('');
                setEditingDescription('');

            } else {
                console.error('Unable to update todo');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
        finally {
            setEditingTodoId(null);
            setEditingTitle('');
            setEditingDescription('');
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setTodos(todos.filter((todo) => todo.id !== id));
            } else {
                console.error('Unable to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };
    return (
        <section>
            {loading && <Loader />}
            {!loading && <div className="p-8 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-4">Your Tasks To Do!</h1>

                <div className="mb-4 flex flex-col items-center justify-center">
                    <input
                        type="text"
                        name="title"
                        placeholder="Todo Title"
                        value={newTodo.title}
                        onChange={handleInputChange}
                        className="border p-2 mr-2 mb-4"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Todo Description"
                        value={newTodo.description}
                        onChange={handleInputChange}
                        className="border p-2 mr-2 mb-4"
                    />
                    {addItemLoading && <Loader />}
                    {!addItemLoading && <button onClick={handleAddTodo} className="bg-yellow-500 hover:bg-yellow-400 rounded text-white p-2 mb-7">
                        Add Todo
                    </button>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {todos.map((todo) => (
                        <div key={todo.id} className="border p-8 rounded-md shadow-md">
                            <p>{todo.id}</p>
                            {editingTodoId === todo.id ? (
                                <>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Todo Title"
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        className="border"
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder="Todo Description"
                                        value={editingDescription}
                                        onChange={(e) => setEditingDescription(e.target.value)}
                                        className="border"
                                    />
                                </>
                            ) :
                                (
                                    <>
                                        <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
                                        <p className="text-gray-600">{todo.description}</p>
                                    </>
                                )}
                            <div className="mt-4 flex justify-end items-end space-x-2">
                                {editingTodoId === todo.id ? (
                                    <>
                                        <IconButton onClickFunc={() => handleSaveTodo()} icon="/save.svg" />
                                    </>
                                ) : (
                                    <>
                                        <IconButton onClickFunc={() => handleUpdateTodo(todo.id)} icon="/pencil.svg" />
                                        <IconButton onClickFunc={() => handleDeleteTodo(todo.id)} icon="/delete.svg" />
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </section>
    );
}
