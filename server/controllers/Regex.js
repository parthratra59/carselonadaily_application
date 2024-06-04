import db from "../config/database.js"


const searchFAQs = async (req, res) => {
    try {
      const { searchTerm } = req.query;
  
      if (!searchTerm) {
        return res.status(400).send({
          message: "Search term is required",
        });
      }
  
      const pattern = `%${searchTerm}%`;
  
      const results = await db.query(
        `SELECT * FROM datas WHERE questions LIKE ? OR shortAnswer LIKE ? OR tags LIKE ? or longAnswer LIKE ?`,
        [pattern, pattern, pattern,pattern]
      );
  
      res.status(200).send({
        message: "Search completed successfully",
        data: results[0],
      });
    } catch (error) {
      res.status(500).send({
        message: "Search failed",
        error: error,
      });
    }
  };

export default searchFAQs