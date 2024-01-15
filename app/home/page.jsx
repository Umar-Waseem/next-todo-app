"use client"


import { toast } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

import Link from "next/link";
import Image from 'next/image';

import Loader from '../components/Loader';
import IconButton from '../components/IconButton';

import "../globals.css"

const BASE_URL = 'https://todo-api-umar.vercel.app';

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

        if (!newTodo.title || !newTodo.description) {
            toast.error('Task title or description cannot be empty!', {
                duration: 4000,
            })
            return;
        }

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
                toast.success('Task added successfully!', {
                    duration: 4000,
                })
                const data = await response.json();
                console.log(data);
                setTodos([...todos, data]);
                setNewTodo({ title: '', description: '' });
            } else {
                console.error('Unable to add todo');
                toast.error('Task couldnt be added due to an error!', {
                    duration: 4000,
                })
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            toast.error('Task couldnt be added due to an error!', {
                duration: 4000,
            })
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

        if (!editingTitle || !editingDescription) {
            toast.error('Task title or description cannot be empty!', {
                duration: 4000,
            })
            return;
        }

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
                toast.success('Task updated successfully!', {
                    duration: 4000,
                })
                setEditingTodoId(null);
                setEditingTitle('');
                setEditingDescription('');

            } else {
                console.error('Unable to update todo');
                toast.error('Task couldnt be updated due to an error!', {
                    duration: 4000,
                })
                setEditingTodoId(null);
                setEditingTitle('');
                setEditingDescription('');
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
                toast.success('Task deleted successfully!', {
                    duration: 4000,
                })
            } else {
                console.error('Unable to delete todo');
                toast.error('Task couldnt be delete due to an error!', {
                    duration: 4000,
                })
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            toast.error('Task couldnt be delete due to an error!', {
                duration: 4000,
            })
        }
    };



    return (
        <section className={loading ? "flex flex-col justify-center items-center min-h-screen" : ""}>
            {loading && <Loader />}
            {!loading && <nav className="bg-yellow-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-white text-xl font-bold">Todo App</Link>
                    <div>
                        <Link href="/" className="text-white bg-red-600 p-2 rounded hover:bg-red-500">Logout</Link>
                    </div>
                </div>
            </nav>}





            {!loading && (
                <div className="flex flex-col p-8">
                    <div className="mb-4 flex flex-col">
                        <h1 className="text-4xl font-bold mb-4">Your Tasks</h1>
                        <div className="flex flex-row">

                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Todo Title"
                                    value={newTodo.title}
                                    onChange={handleInputChange}
                                    className="border p-4 mr-2 mb-4"
                                />
                                <textarea
                                    type="text"
                                    name="description"
                                    placeholder="Todo Description"
                                    value={newTodo.description}
                                    onChange={handleInputChange}
                                    className="border p-4 mr-2 mb-4 resize-none"
                                    rows={4}
                                    cols={30}
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                {addItemLoading && <Loader />}
                                {!addItemLoading &&
                                    <IconButton onClickFunc={() => handleAddTodo()} icon="/plus.svg" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-full">

                        {/* Todo List */}
                        <ul className="w-full">
                            {todos.map((todo) => (
                                <li key={todo.id} onDoubleClick={() => handleDeleteTodo(todo.id)} className="border p-8 rounded-md shadow-md mb-4 w-full hover:bg-gray-100 hover:border-gray-300">
                                    <div className="flex flex-row justify-end">
                                        <button onClick={() => {
                                            const currentDate = new Date().toLocaleString();
                                            toast.success(`Item ID is ${todo.id}\n\nTime of creation: ${currentDate}`, {
                                                duration: 5000,
                                            });
                                        }}>
                                            <Image src="/info.svg" width={20} height={20} alt={"info-icon"} />
                                        </button>
                                    </div>
                                    {editingTodoId === todo.id ? (
                                        <>
                                            <input
                                                type="text"
                                                name="title"
                                                placeholder="Todo Title"
                                                value={editingTitle}
                                                onChange={(e) => setEditingTitle(e.target.value)}
                                                className="border w-full p-2"
                                            />
                                            <textarea
                                                type="text"
                                                name="description"
                                                placeholder="Todo Description"
                                                value={editingDescription}
                                                onChange={(e) => setEditingDescription(e.target.value)}
                                                className="border w-full mt-2 p-2"
                                                rows={3}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div className="div flex flex-row">
                                                <Image src="checklist.svg" width={50} height={50} alt={"checklist-icon"} />
                                                <div className="ml-4">
                                                    <h3 className="text-2xl font-semibold mb-2">{todo.title}</h3>
                                                    <p className="text-gray-500">
                                                        {todo.description}
                                                    </p>
                                                </div>
                                            </div>


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
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    );

}
