import React, { useState, useEffect } from 'react';
import { database } from "../config";
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function Crud({}) {
    const [ name, setName ] = useState(null);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);
    const [ val, setVal ] = useState([]);
    const value = collection(database, "myFirstFirestoreDatabase");

    const onSubmit = async (e) => {
        e.preventDefault();
        if(show){
            setName("");
            const updateData = doc(database, "myFirstFirestoreDatabase", id);
            await updateDoc(updateData, {name: name});
            setShow(false)

        }else {
            setName("");
            await addDoc(value, {id: uuidv4(), name: name}); e.target.reset();
            console.log(name);

        }

    }

    const onDelete = async(id, name) => {
        if(window.confirm(`Do you want to delete it? ( ${name} )`)){
            const deleteVal = doc(database, "myFirstFirestoreDatabase", id);
            await deleteDoc(deleteVal);
        }
    }

    const onEdit = (id, name) => {
        setShow(true);
        setName(name);
        setId(id);
    }


    useEffect(() => {
        const getData = async() => {
            const dbVal = await getDocs(value);
            setVal(dbVal.docs.map(doc => ({...doc.data(), id: doc.id})));
        }
        getData();
    },[val])
    return (
        <div className="container mt-5">
            <div className="row mt-5 justify-content-center">
                <div className="col-xl-5 col-md-7">
                    <div className="card shadow-lg">
                        <div className="card-body">

                            <form onSubmit={(e) => {onSubmit(e)}}>
                                <input type="text" placeholder="  Enter name" className="form-control" value={name} onChange={(e) => {setName(e.target.value)}}/>
                                <button className="btn btn-primary mt-2 w-100">Submit data</button>
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
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>


                                {
                                    val.map((item, index)=> (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <button className="btn btn-warning" onClick={() => {onEdit(item.id, item.name)}}>
                                                    edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={()=>{onDelete(item.id, item.name)}}
                                                >
                                                    delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }


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