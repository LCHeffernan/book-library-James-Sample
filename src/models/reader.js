module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {args: true, msg: "use a valid email address"},
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {args: [8, 16], msg: "password too short or long"},
      }
    },
  };

  const ReaderModel = connection.define("Reader", schema);
  return ReaderModel;
};
