import House from '../models/House';
import User from '../models/User';


class HouseController{

    async index(req, res){
        const {status} = req.query;

        const houses = await House.find({status});

        return res.json(houses);
    }

    async store(req, res){
        const { filename } = req.file;
        const {description, price, location, status} = req.body;
        const {user_id} = req.headers;

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });

        return res.json(house)
    }

    async update (req, res) {
        const { filename } = req.file || {}; // Evita erro se não houver arquivo
        const { house_id } = req.params;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;
    
        console.log("📥 Headers recebidos:", req.headers);
        console.log("🔍 user_id recebido:", user_id);
    
        const user = await User.findById(user_id);
        console.log("👤 Usuário encontrado:", user);
    
        const houses = await House.findById(house_id);
        console.log("🏠 Casa encontrada:", houses);
    
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    
        if (!houses) {
            return res.status(404).json({ error: 'Casa não encontrada' });
        }
    
        if (String(user._id) !== String(houses.user)) {
            return res.status(401).json({ error: 'Não autorizado' });
        }
    
        await House.updateOne({ _id: house_id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });
    
        return res.send();
    }

    async destroy(req, res) {
        try {
            const { house_id } = req.params;
            const { user_id } = req.headers;

            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

            const house = await House.findById(house_id);
            if (!house) return res.status(404).json({ error: 'Casa não encontrada' });

            if (String(user._id) !== String(house.user)) {
                return res.status(401).json({ error: 'Não autorizado' });
            }

            await House.findByIdAndDelete(house_id);

            return res.json({ message: 'Deletado com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao deletar casa' });
        }
    }
}

export default new HouseController();