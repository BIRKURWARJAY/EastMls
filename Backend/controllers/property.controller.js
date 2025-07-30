const addProperty = async (req, res) => {
    try {
        const data = req.body

        if (!data.agentId || !data.title || !data.address || !data.description || !data.status || !data.type || 
            !data.images || !data.location || !data.price || !data.areaSqFt || !data.landArea || !data.city || !data.country || 
            !data.currency || !data.leaseType || !data.verification) {
            return res.status(400).json({
                status: 400,
                message: "Missing required fields",
            });
        }

    } catch (error) {
        console.error("Add Property Error:", error);
        res.status(500).json({
            message: "Error adding property",
            error: error.message,
        });
    }
}


export { addProperty } 