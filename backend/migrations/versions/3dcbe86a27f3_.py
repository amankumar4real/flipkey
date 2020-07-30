"""empty message

Revision ID: 3dcbe86a27f3
Revises: fbc4feca4a2e
Create Date: 2020-07-30 17:57:59.719955

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '3dcbe86a27f3'
down_revision = 'fbc4feca4a2e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('city', 'lat')
    op.drop_column('city', 'lng')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('city', sa.Column('lng', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    op.add_column('city', sa.Column('lat', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
