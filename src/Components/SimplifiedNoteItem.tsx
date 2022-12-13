import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag } from "../Context/StateContext";
import styles from "../Note.module.css";

export type SimplifeidNoteProps = {
  tags: Tag[];
  title: string;
  id: string;
};
function SimplifiedNoteItem({ tags, title, id }: SimplifeidNoteProps) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none   ${styles.card} `}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((t) => (
                <Badge key={t.id} className="text-truncate">
                  {t.value}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

export default SimplifiedNoteItem;
