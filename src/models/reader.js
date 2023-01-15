module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: "Please enter a name" },
        notNull: { args: true, msg: "Please enter a name" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { args: true, msg: "use a valid email address" },
        notEmpty: { args: true, msg: "Please enter an email" },
        notNull: { args: true, msg: "Please enter an email" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [8, 16], msg: "password too short or long" },
        notEmpty: { args: true, msg: "Please enter a password" },
        notNull: { args: true, msg: "Please enter a password" },
      },
    },
    books: DataTypes.STRING
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
