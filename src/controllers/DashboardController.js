import House from '../models/House';
import User from '../models/User';

class DashboardController {
    async show(req, res) {
        try {
            console.log("Headers recebidos:", req.headers);

            const { user_id } = req.headers;

            if (!user_id) {
                console.log("Erro: User ID não fornecido");
                return res.status(400).json({ error: "User ID não fornecido" });
            }

            // Verifica se o usuário existe
            const userExists = await User.findById(user_id);
            if (!userExists) {
                console.log("Erro: Usuário não encontrado");
                return res.status(400).json({ error: "Usuário não encontrado" });
            }

            const houses = await House.find({ user: user_id });
            console.log("Casas encontradas:", houses);

            if (!houses || houses.length === 0) {
                console.log("Nenhuma casa encontrada para este usuário");
                return res.status(404).json({ error: "Nenhuma casa encontrada para este usuário" });
            }

            return res.json(houses);
        } catch (error) {
            console.error("Erro no servidor:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

export default new DashboardController();

