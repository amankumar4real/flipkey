"""empty message

Revision ID: 42626da23975
Revises: 6f3a2661418f
Create Date: 2020-07-25 16:59:25.869546

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '42626da23975'
down_revision = '6f3a2661418f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('amenities', sa.Column('sea_view', sa.String(length=10), nullable=True))
    op.drop_column('amenities', 'sea_viewgit')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('amenities', sa.Column('sea_viewgit', mysql.VARCHAR(length=10), nullable=True))
    op.drop_column('amenities', 'sea_view')
    # ### end Alembic commands ###
