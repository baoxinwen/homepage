import React from 'react';

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  titleId?: string;
  action?: React.ReactNode;
}

/* 全站统一的区块标题：编号 + 英文小标 kicker 在上，中文大标题在下，右侧可选操作链接 */
const SectionHeading: React.FC<SectionHeadingProps> = ({ index, label, title, titleId, action }) => (
  <div className="section-heading">
    <div>
      <div className="section-kicker">
        <span>{index}</span>
        <i />
        <span>{label}</span>
      </div>
      <h2 id={titleId}>{title}</h2>
    </div>
    {action && <div className="section-action">{action}</div>}
  </div>
);

export default React.memo(SectionHeading);
