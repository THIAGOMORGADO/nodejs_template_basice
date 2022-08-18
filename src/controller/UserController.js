import User from '../model/Use'
import { createPasswordHash } from '../service/auth';


class UserController {
  // listando todo registro no banco de dados
  async index (req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error! " });
    }
  }
  // LIstando registro por ID 
  async show (req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if(!user) {
        return res.status(404).json();
      }

      return res.json(user);


    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Internal server error"});
    }
  }
  // criando registro no banco de dados
  async create (req, res) {
    try {
    const {email, password} = req.body;  
    
    const user = await User.findOne({ email });
    
    if(user) {
      return res
      .status(422)
      .json({message: `User ${email} already exists`});
    }

    // criptografia bycript

    const passwordHash = await createPasswordHash(password);

    // Criando op registro no banco !!!
    const newUser = await User.create({
        email, 
        password: passwordHash,
      });
       
    return res.status(201).json(newUser);
       
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error! " });
      
    }
  }
  // Atualizando informação do banco de dados pelo id
  async update (req, res) {
    try {
      const { id } = req.params
      const {email, password } = req.body

      const user = await User.findById(id);

      if(!user) {
        return res.status(404).json();
      }

      const passwordHash = await createPasswordHash(password);

      await User.updateOne({
        email,
        password: passwordHash
      })

      return res.status(200).json()

    } catch (err) {
      console.log(err);
      return res.status(500).json({error: "Internal server error. "})
    }

  }
  // Deletando o registro no banco de dados pelo id
  async destroy (req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if(!user) {
        return res.status(404).json();
      }
      await user.deleteOne();

      return res.status(200).json()

    } catch (err) {
      console.log(err);
      return res.status(500).json({error: "Internal server error. "})  
    }
  }
}

export default new UserController();