VPOffsets = {}

/**
 * Calculates the vertical distance between two graphics which are directly vertical from each other.
 *
 * @param Graphic graphic
 *            The graphic which will be used to calculate the vertical offset.
 * @return The vertical distance between graphics at the position of the given graphic.
 */
VPOffsets.getFullVerticalOffset = function(graphic)
{
    return 2 * this.getHalfVerticalOffset(graphic);
}

/**
 * Calculates the vertical distance between two graphics which are directly vertical from each other.
 *
 * @param Vector2D center
 *            The center point of one of the graphics.
 * @return The vertical distance between graphics at the given center point.
 */
VPOffsets.getFullVerticalOffset_v = function(center)
{
    var topLeftX = center.x - GRAPHIC_HALF_WIDTH;
    var distanceFromRightSide = canvas.width() - topLeftX;
    return this.getFullVerticalOffset_f(distanceFromRightSide);
}

/**
 * Calculates the vertical distance between two graphics which are directly vertical from each other.
 *
 * @param float distanceFromRightSide
 *            The distance between the right side of the window and the left side of the graphic.
 * @return The vertical distance between graphics at the position of the given graphic.
 */
VPOffsets.getFullVerticalOffset_f = function(distanceFromRightSide)
{
    return 2 * this.getHalfVerticalOffset_f(distanceFromRightSide);
}

/**
 * Calculates half of the vertical distance between two graphics which are directly vertical from each other.
 *
 * @param Graphic graphic
 *            The graphic which will be used to calculate the vertical distance.
 * @return Half of the vertical distance between the centers of two graphics whose centers are on the same vertical line.
 */
VPOffsets.getHalfVerticalOffset = function(graphic)
{
    var distanceFromRightSide = canvas.width() - graphic.getTopLeftCorner().x;
    return this.getHalfVerticalOffset_f(distanceFromRightSide);
}

/**
 * Calculates half of the vertical distance between two graphics which are directly vertical from each other.
 *
 * @param float distanceFromRightSide
 *            The distance between the right side of the window and the left side of the graphic.
 * @return Half of the vertical distance between the centers of two graphics whose centers are on the same vertical line.
 */
VPOffsets.getHalfVerticalOffset_f = function(distanceFromRightSide)
{
    var exp = distanceFromRightSide / GRAPHIC_HORIZ_OFFSET;
    var offset = GRAPHIC_HALF_VERT_OFFSET * Math.pow(2, exp);

    return offset;
}

/**
 * Calculates half of the vertical distance between two graphics which are directly vertical from each other.
 *
 * @param float distanceFromRightSide
 *            The distance between the right side of the window and the left side of the graphic.
 * @param float scale
 *            The scale to be used for the calculation, instead of the current global scale.
 * @return Half of the vertical distance between the centers of two graphics whose centers are on the same vertical line.
 */
VPOffsets.getHalfVerticalOffset_fs = function(distanceFromRightSide, scale)
{
    var exp = distanceFromRightSide / (GRAPHIC_HORIZ_OFFSET * scale);
    var offset = GRAPHIC_VERT_OFFSET * scale * Math.pow(2, exp);

    return offset;
}

/**
 * Calculates the vertical distance between a graphic and the graphic representing that graphic's child.
 *
 * @param Graphic parent
 *            The graphic which represents the parent, used to calculate the vertical offset.
 * @return A positive number representing the vertical distance between a parent graphic and a child graphic.
 */
VPOffsets.getVerticalOffsetToChild = function(parent)
{
    var distanceFromRightSide = canvas.width() - (parent.getTopLeftCorner().x + GRAPHIC_HORIZ_OFFSET);
    return this.getHalfVerticalOffset_f(distanceFromRightSide);
}

/**
 * Calculates the vertical distance between a graphic and the graphic representing that graphic's child.
 *
 * @param parentCenter
 *            The center point of the parent graphic
 * @return A positive number representing the vertical distance between a parent graphic and a child graphic.
 */
VPOffsets.getVerticalOffsetToChild_v = function(parentCenter)
{
    var topLeftX = parentCenter.x - GRAPHIC_HALF_WIDTH + GRAPHIC_HORIZ_OFFSET;
    var distanceFromRightSide = canvas.width() - topLeftX;
    return this.getHalfVerticalOffset_f(distanceFromRightSide);
}

/**
 * Calculates the vertical distance between a child graphic and a parent graphic.
 *
 * @param child
 *            The graphic of the child.
 * @return A positive number representing the vertical distance between a parent graphic and a child graphic.
 */
VPOffsets.getVerticalOffsetToParent = function(child)
{
    var distanceFromRightSide = canvas.width() - child.getTopLeftCorner().x;
    return this.getHalfVerticalOffset_f(distanceFromRightSide);
}

/**
 * Calculates the vertical distance between a child graphic and a parent graphic.
 *
 * @param childCenter
 *            The center point of the child graphic.
 * @return A positive number representing the vertical distance between a parent graphic and a child graphic.
 */
VPOffsets.getVerticalOffsetToParent_v = function(childCenter)
{
    var topLeftX = childCenter.x - GRAPHIC_HALF_WIDTH;
    var distanceFromRightSide = canvas.width() - topLeftX;
    return this.getHalfVerticalOffset_f(distanceFromRightSide);
}

/**
 * Calculates the vertical distance between a child graphic and a parent graphic.
 *
 * @param child
 *            The graphic of the child.
 * @param scale
 *            The scale to be used for the calculation, instead of the current global scale.
 * @return A positive number representing the vertical distance between a parent graphic and a child graphic.
 */
VPOffsets.getVerticalOffsetToParent_gs = function(child, scale)
{
    var leftSideOfParent = child.getCenterPoint().x + ((GRAPHIC_WIDTH / 2 + GRAPHIC_HORIZ_OFFSET) * scale);
    var distanceFromRightSide = canvas.width() - leftSideOfParent;
    return this.getHalfVerticalOffset_fs(distanceFromRightSide, scale);
}

VPOffsets.getCenterOfNeighbor_v = function(center, id, isNorthChild)
{
    switch (id)
    {
        case NORTH_CHILD:
            return this.getCenterOfNorthChild_v(center);
        case SOUTH_CHILD:
            return this.getCenterOfSouthChild_v(center);
        case PARENT:
            return this.getCenterOfParent_v(center, isNorthChild);
        case NORTH:
            return this.getCenterOfNorthNode_v(center);
        case SOUTH:
            return this.getCenterOfSouthNode_v(center);
        default:
            return null;
    }
}

VPOffsets.getCenterOfNorthChild_v = function(center)
{
    center.add(GRAPHIC_HORIZ_OFFSET, -this.getVerticalOffsetToChild_v(center));
    return center;
}

VPOffsets.getCenterOfSouthChild_v = function(center)
{
    center.add(GRAPHIC_HORIZ_OFFSET, this.getVerticalOffsetToChild_v(center));
    return center;
}

VPOffsets.getCenterOfParent_v = function(center, isNorthChild)
{
    var newCenter = center.getSubtractedCopy(GRAPHIC_HORIZ_OFFSET, this.getVerticalOffsetToParent_v(center) * (isNorthChild ? -1 : 1));

    return newCenter;
}

VPOffsets.getCenterOfNorthNode_v = function(center)
{
    center.subtract(0, this.getFullVerticalOffset_v(center));
    return center;
}

VPOffsets.getCenterOfSouthNode_v = function(center)
{
    center.add(0, this.getFullVerticalOffset_v(center));
    return center;
}

VPOffsets.getCenterOfNeighbor = function(graphic, id)
{
    switch (id)
    {
        case 'NORTH_CHILD':
            return this.getCenterOfNorthChild(graphic);
        case 'SOUTH_CHILD':
            return this.getCenterOfSouthChild(graphic);
        case 'PARENT':
            return this.getCenterOfParent(graphic);
        case 'NORTH':
            return this.getCenterOfNorthNode(graphic);
        case 'SOUTH':
            return this.getCenterOfSouthNode(graphic);
        default:
            return null;
    }
}

VPOffsets.getCenterOfNorthChild = function(graphic)
{
    var center = graphic.getCenterPoint();
    center.add(GRAPHIC_HORIZ_OFFSET, -this.getVerticalOffsetToChild(graphic));
    return center;
}

VPOffsets.getCenterOfSouthChild = function(graphic)
{
    var center = graphic.getCenterPoint();
    center.add(GRAPHIC_HORIZ_OFFSET, this.getVerticalOffsetToChild(graphic));
    return center;
}

VPOffsets.getCenterOfParent = function(graphic)
{
    var center = graphic.getCenterPoint();
    var newCenter = center.getSubtractedCopy(GRAPHIC_HORIZ_OFFSET, this.getVerticalOffsetToParent(graphic) * (graphic.isNorthChild() ? -1 : 1));

    return newCenter;
}

VPOffsets.getCenterOfNorthNode = function(graphic)
{
    var center = graphic.getCenterPoint();
    center.subtract(0, this.getFullVerticalOffset(graphic));
    return center;
}

VPOffsets.getCenterOfSouthNode = function(graphic)
{
    var center = graphic.getCenterPoint();
    center.add(0, this.getFullVerticalOffset(graphic));
    return center;
}