"""empty message

Revision ID: da5b37becf79
Revises: 335ef9b132ec
Create Date: 2020-07-22 16:04:28.052463

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'da5b37becf79'
down_revision = '335ef9b132ec'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('phone', sa.Integer(), nullable=True))
    op.add_column('user', sa.Column('type', sa.String(length=60), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'type')
    op.drop_column('user', 'phone')
    # ### end Alembic commands ###