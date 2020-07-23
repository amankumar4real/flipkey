"""empty message

Revision ID: c4de2fc8caa3
Revises: da5b37becf79
Create Date: 2020-07-23 15:57:11.645045

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c4de2fc8caa3'
down_revision = 'da5b37becf79'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('google_auth',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=60), nullable=True),
    sa.Column('email', sa.String(length=60), nullable=True),
    sa.Column('google_id', sa.String(length=100), nullable=True),
    sa.Column('type', sa.String(length=60), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('google_auth')
    # ### end Alembic commands ###
