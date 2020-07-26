"""empty message

Revision ID: 663c4cc8bc27
Revises: 334e4399c6aa
Create Date: 2020-07-26 19:41:43.891921

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '663c4cc8bc27'
down_revision = '334e4399c6aa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('review',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=70), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('rev_date', sa.DateTime(timezone=True), nullable=True),
    sa.Column('review', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['property_id'], ['product.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('review')
    # ### end Alembic commands ###