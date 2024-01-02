const errorHandler = (err,req,res,next)=>{
    return res.status(404).json({
        success:false,
        message:err.message || "Internal Server Error"
    })
}

export default errorHandler;