"""empty message

Revision ID: c969f18cabb7
Revises: 3dcbe86a27f3
Create Date: 2020-07-30 17:58:30.798389

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c969f18cabb7'
down_revision = '3dcbe86a27f3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('city', sa.Column('lat', sa.String(length=50), nullable=True))
    op.add_column('city', sa.Column('lng', sa.String(length=50), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('city', 'lng')
    op.drop_column('city', 'lat')
    # ### end Alembic commands ###