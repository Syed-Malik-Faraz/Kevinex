import Message from "../models/messageModel.js";

// @desc    Create new message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400).json({ message: "Please fill all fields" });
    return;
  }

  const newMessage = new Message({
    name,
    email,
    subject,
    message,
  });

  const createdMessage = await newMessage.save();
  res.status(201).json(createdMessage);
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
const deleteMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    await message.deleteOne();
    res.json({ message: "Message removed" });
  } else {
    res.status(404).json({ message: "Message not found" });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
const markAsRead = async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (message) {
    message.isRead = true;
    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } else {
    res.status(404).json({ message: "Message not found" });
  }
};

export { createMessage, getMessages, deleteMessage, markAsRead };
