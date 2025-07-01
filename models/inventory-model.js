const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

async function getClassificationById(classification_id){
    return await pool.query("SELECT * FROM public.classification WHERE classification_id = $1", [classification_id])
} 

async function getVehicleListByClassificationId(classification_id) {
    return await pool.query("SELECT * FROM public.inventory WHERE classification_id = $1", [classification_id])
}

async function getVehicleById(inv_id) {
    return await pool.query("SELECT * FROM public.inventory WHERE inv_id = $1", [inv_id])
}

async function setClassification(classification_name) {
    return await pool.query("INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING classification_id", [classification_name])
    
}

async function setInventory(inv_make, inv_model, inv_year, inv_miles, inv_color, inv_price, inv_description, inv_image, inv_thumbnail, classification_id) {
    return await pool.query("INSERT INTO public.inventory (inv_make, inv_model, inv_year, inv_miles, inv_color, inv_price, inv_description, inv_image, inv_thumbnail, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING inv_id", 
        [inv_make, inv_model, inv_year, inv_miles, inv_color, inv_price, inv_description, inv_image, inv_thumbnail, classification_id])
}

module.exports = {getClassifications, getVehicleListByClassificationId, getVehicleById, getClassificationById, setClassification, setInventory}