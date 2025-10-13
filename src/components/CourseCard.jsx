import { Link } from "react-router-dom";
import { forwardRef } from "react";
import "./CourseCard.css";

const CourseCard = forwardRef(({ title, description, to, image }, ref) => (
	<Link ref={ref} to={to} className="course-card">
		<div className="course-card__thumb">
			<img src={image} alt={title} />
		</div>
		<div className="course-card__body">
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
		<span className="course-card__cta">Start Now →</span>
	</Link>
));
CourseCard.displayName = "CourseCard";

export default CourseCard;
