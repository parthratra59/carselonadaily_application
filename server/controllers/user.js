import express from "express";
import db from "../config/database.js";

const createFAQ = async (req, res) => {
  try {

  
    const { questions, shortAnswer, longAnswer, catgory_id, tags} = req.body;

    if(!questions || !shortAnswer || !longAnswer || !catgory_id || !tags) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    if (!Array.isArray(tags)) {
      return res.status(400).send({
        message: "Tags must be sent as an array",
      });
    }
    
    const joinedTags = tags.join(','); 
    

    await db.query(
      `INSERT INTO datas (questions, shortAnswer, longAnswer, catgory_id, tags) VALUES (?,?,?,?,?)`,
      [questions, shortAnswer, longAnswer, catgory_id, joinedTags]
    );

    res.status(200).send({
      message: "FAQ created successfully",
      
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to create",
      error: error,
    });
  }
};

const getfaQid = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id  ) {
  
      return res.status(400).send({ message: "id is required" });
    }

    const [data] = await db.query(
      `SELECT * FROM datas WHERE id = ?`,
      id
    );
    if (!data.length) {
      return res.status(404).send({ message: "id not found in the DB" });
    }

    res.status(200).send({
      message: "FAQ retrieved successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in getting faQid",
      error: error,
    });
  }
};


const getAllData =async(req,res)=>{
  try{
    const [data] = await db.query(
      `SELECT * FROM datas`
    );

    res.status(200).send({
      message: "FAQ retrieved successfully",
      data: data,
    });

  }
  catch(error){
    res.status(500).send({
      message: "Error in getting all data",
      error: error,
    });
  }
}


export {createFAQ,getfaQid,getAllData};
