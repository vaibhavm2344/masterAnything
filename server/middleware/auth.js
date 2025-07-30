import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const {token} = req.headers;

    if(!token){
        return res.json({success: false, message: "Not Authorized Login Agian"})
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.SECRET_KEY)

        if(tokenDecode.id){
            if(!req.body){
                req.body = {};
            }

            req.body.userId = tokenDecode.id;
        }else{
            return res.json({
                success:false,
                message:"Not Authorized Login Agian"
            })
        }
        next();

    }
    catch(error){
        console.error('Auth middleware error:', error);
        res.status(401).json({success:false, message:error.message})
    }
}

export default userAuth