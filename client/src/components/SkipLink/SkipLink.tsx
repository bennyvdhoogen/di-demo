import React from 'react';
import styled from 'styled-components';
import { Button, themeSpacing } from '@amsterdam/asc-ui';
import content from '@services/content';

interface IProps {
    className?: string;
}

export const SkipLinkTargetIds = { content: 'skiplink-entry', footer: 'skiplink-footer-entry' };

export const SkipLink: React.FC<IProps> = ({ className }) => {
    return (
        <SkipLinkContainer className={className}>
            <Button variant="textButton" as="a" href={`#${SkipLinkTargetIds.content}`}>
                {content.header.skipLink.content}
            </Button>
            <Button variant="textButton" as="a" href={`#${SkipLinkTargetIds.footer}`}>
                {content.header.skipLink.footer}
            </Button>
        </SkipLinkContainer>
    );
};

const SkipLinkContainer = styled.div`
    max-width: 400px;

    a {
        min-width: 0;
        width: 0;
        height: 0;
        padding: 0;
        overflow: hidden;

        &:focus {
            width: auto;
            height: auto;
            padding: ${themeSpacing(3)} ${themeSpacing(4)};
        }
    }
`;

export const SkipLinkEntry = <div id={SkipLinkTargetIds.content} />;
export const SkipLinkFooterEntry = <div id={SkipLinkTargetIds.footer} />;
