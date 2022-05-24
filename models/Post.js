const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our Post model
class Post extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_content',
                    'title',
                    'created_at'
                ],
                include: [
                    {
                        model: models.Comment,
                        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                        inhclude: {
                            model: models.User,
                            attributes: ['username']
                        }
                    }
                ]
            });
        });
    }
}

// Create fields/columns for Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'user',
                    key: 'id'
                }
            }
        },
        {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'post'
        }
);

module.exports = Post;