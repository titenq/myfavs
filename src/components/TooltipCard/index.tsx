import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import styles from '@/components/TooltipCard/TooltipCard.module.css';
import { ITooltipProps } from '@/interfaces/tooltipInterface';

const TooltipCard = (props: ITooltipProps) => {
  const Icon = props.icon;

  return (
    <OverlayTrigger
      placement='top'
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip id={props.id} style={{ position: "fixed" }}>
          {props.tooltipText}
        </Tooltip>
      }
    >
      <span>
        <Icon
          size={18}
          className={styles.cursor_pointer}
          onClick={props.onClick}
        />
      </span>
    </OverlayTrigger>
  );
};

export default TooltipCard;
