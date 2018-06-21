// https://gamedev.stackexchange.com/questions/5585/line-triangle-intersection-last-bits

/*! @param PIP Point-in-Plane */
bool Channel::testRayThruTriangle( Vector3f P1, Vector3f P2, Vector3f P3, Vector3f R1, Vector3f R2, Vector3f& PIP)
{  
    Vector3f Normal, IntersectPos;

    // Find Triangle Normal
    Normal.cross( P2 - P1, P3 - P1 );
    Normal.normalize(); // not really needed?  Vector3f does this with cross.

    // Find distance from LP1 and LP2 to the plane defined by the triangle
    float Dist1 = (R1-P1).dot( Normal );
    float Dist2 = (R2-P1).dot( Normal );

    if ( (Dist1 * Dist2) >= 0.0f) { 
        //SFLog(@"no cross"); 
        return false; 
    } // line doesn't cross the triangle.

    if ( Dist1 == Dist2) { 
        //SFLog(@"parallel"); 
        return false; 
    } // line and plane are parallel

    // Find point on the line that intersects with the plane
    IntersectPos = R1 + (R2-R1) * ( -Dist1/(Dist2-Dist1) );

    // Find if the interesection point lies inside the triangle by testing it against all edges
    Vector3f vTest;

    vTest = Normal.cross( P2-P1 );
    if ( vTest.dot( IntersectPos-P1) < 0.0f ) { 
        //SFLog(@"no intersect P2-P1"); 
        return false; 
    }

    vTest = Normal.cross( P3-P2 );
    if ( vTest.dot( IntersectPos-P2) < 0.0f ) { 
        //SFLog(@"no intersect P3-P2"); 
        return false; 
    }

    vTest = Normal.cross( P1-P3 );
    if ( vTest.dot( IntersectPos-P1) < 0.0f ) { 
        //SFLog(@"no intersect P1-P3"); 
        return false; 
    }

    NSLog(@"Intersects at ( %f, %f )", IntersectPos.x(), IntersectPos.y());

    PIP = IntersectPos;

    return true;
}