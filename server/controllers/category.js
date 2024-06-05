
import db from "../config/database.js"



const categories= async(req,res)=>{
    try{

        const [data] = await db.query(`SELECT * FROM category `)

        res.status(200).send({
            message: "Category listing",
            data: data,
        });

    }
    catch(error){
        res.status(500).send({
            message: "There is no category listing",
            error: error,
        });
    }
}

const categorylisting = async(req,res)=>{
    try{
        const [data] = await db.query(`SELECT catgorynames, COUNT(*) AS question_count
        FROM category AS c
        INNER JOIN datas AS d ON c.catgoryid = d.catgory_id
        GROUP BY catgorynames`)

        console.log("data",data)

        res.status(200).send({
            message: "Category listing",
            data: data,
        });

    }
    catch(error)
    {
        res.status(500).send({
            message: "There is no category listing",
            error: error,
        });
    }
}


export {categorylisting,categories}