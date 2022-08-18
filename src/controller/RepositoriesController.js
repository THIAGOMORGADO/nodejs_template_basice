import User  from '../model/Use';
import Repository from '../model/Repository';

class RepositoryController {
  async index(req,res) {
    try {
      const {user_id} = req.params;
      const user = await User.findById(user_id);

      if(!user) {
        res.status(404).json();
      }

      const repositories = await Repository.find({
        userId: user_id
      });

      return res.json(repositories);
r
    } catch (err) {
      console.log(err);
      return res.status(500).json({error: "Internal server error"})
    }
  }

  async create(req,res) {
    try {
      const { user_id } = req.params;
      const {name, url} = req.body;
      const user = await User.findById(user_id);

      if(!user) {
        return res.status(404).json();
      }

      const repository = await Repository.findOne({
        userId: user_id,
        name
      })

      if(repository) {
        return res.status(402).json({messager: `Repository ${name} already exists`})
      }

      const newRepository = await Repository.create({
        name,
        url,
        userId: user_id
      })
      
      return res.status(201).json(newRepository);
      
    } catch (err) {
      console.log(err);
      return res.status(500).json({error: "Internal server error"})
    }
  }

  async destroy(req,res) {
    try {
      const { user_id, id } = req.params;
      const user = await User.findById(user_id);

      
      if(!user) {
        return res.status(404).json();
      }

      const repository = await Repository.findOne({
        userId: user_id,
        id
      })

      if(!repository) {
        return res.status(404).json();
      }

      await Repository.deleteOne()

      return res.status(200).json()
      
    } catch (err) {
      console.log(err);
      return res.status(500).json({error: "Internal server error"})
    }
  }
}

export default new RepositoryController();
