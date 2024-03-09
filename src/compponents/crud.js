import React, { useState, useEffect } from 'react';
import { database } from "../config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function Crud({}) {
    const [ name, setName ] = useState(null);
    const [ val, setVal ] = useState([]);
    const value = collection(database, "myFirstFirestoreDatabase");

    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(value, {id: uuidv4(), name: name});
        console.log(name);
        e.target.reset();
    }

    useEffect(() => {
        const getData = async() => {
            const dbVal = await getDocs(value);
            setVal(dbVal.docs.map(doc => ({...doc.data(), id: doc.id})));
        }
        getData();
    },[])
    return (
        <div className="container mt-5">
            <div className="row mt-5 justify-content-center">
                <div className="col-xl-5 col-md-7">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <form action="" onSubmit={(e) => {onSubmit(e)}}>
                                <input type="text" className="form-control" onChange={(e) => {setName(e.target.value)}}/>
                                <button className="btn btn-primary mt-2 w-100">
                                    Submit data
                                </button>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <div className="card mt-5 shadow-lg">
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {val.map((item, index)=> (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <button className="btn btn-secondary">Edit</button>
                                            </td>
                                            <td>
                                                <button className="btn btn-dark">delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Crud;