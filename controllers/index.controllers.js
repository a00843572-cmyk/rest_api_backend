export const inicio = (req, res) => {

    res.send("Hola desde mi REST API");

};


export const ping = async (req, res) => {

    try {

        res.json([
            {
                resultado: 1
            }
        ]);

    } catch (error) {

        res.status(500).json({
            message: "Error en el servidor"
        });

    }
};