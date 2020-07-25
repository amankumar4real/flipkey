"""empty message

Revision ID: 6f3a2661418f
Revises: 826dcc89e4f4
Create Date: 2020-07-25 16:51:39.696063

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6f3a2661418f'
down_revision = '826dcc89e4f4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('amenities', sa.Column('sea_viewgit', sa.String(length=10), nullable=True))
    op.drop_column('amenities', 'sea_view')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('amenities', sa.Column('sea_view', mysql.VARCHAR(length=10), nullable=True))
    op.drop_column('amenities', 'sea_viewgit')
    # ### end Alembic commands ###
