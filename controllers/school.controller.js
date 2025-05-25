const db =require('../db');
const calculateDistance = require('../utils/distance.calculator');

exports.addSchool =(req,res)=>{
  const {name,address,latitude,longitude} = req.body;
  if(!name || !address || !latitude || !longitude){
    return res.status(400).json({error:'All fields are required'});
  }
  const sql="INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(sql,[name,address,latitude,longitude],(err,result)=>{
    if(err){
      console.error('Error adding school:', err);
      return res.status(500).json({error:'Database error'});
    }
    res.status(201).json({message:'School added successfully', schoolId: result.insertId});
  });
}
exports.listSchools = (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res
      .status(400)
      .json({ message: "Latitude and Longitude are required." });
  }

  const sql = "SELECT * FROM schools";
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });

    const schoolsWithDistance = results.map((school) => ({
      ...school,
      distance: calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      ),
    }));

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(schoolsWithDistance);
  });
};