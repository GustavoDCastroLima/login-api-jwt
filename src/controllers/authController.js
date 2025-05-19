const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body; // Corrigido destructuring
  
  try {
    const existingUser = await User.findOne({ email }); // Objeto, não array
    if (existingUser) return res.status(400).json({ msg: 'Usuário já existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciais inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: user._id }, // Corrigido para user._id
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no servidor' });
  }
};