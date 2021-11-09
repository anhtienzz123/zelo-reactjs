import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckLink, { replaceConentWithouLink, replaceContentToLink } from 'utils/linkHelper';
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import parse from 'html-react-parser'
import './style.scss';
TextMessage.propTypes = {
    content: PropTypes.string,
    dateAt: PropTypes.object,
    isVisibleTime: PropTypes.bool.isRequired,
    isSeen: PropTypes.bool,
    tags: PropTypes.array,
};

TextMessage.defaultProps = {
    dateAt: null,
    isSeen: false,
    tags: []

}

function TextMessage({ content, children, dateAt, isSeen, tags }) {


    const handleOnClickTag = () => {
        console.log("tag");
    }
    useEffect(() => {
        tags.forEach(tag => {
            const temp = document.getElementById(`mtc-${tag._id}`);

            if (temp) {

                temp.onclick = handleOnClickTag;
            }

        })
    }, [tags]);







    const tranferTextToTagUser = (contentMes, tagUser) => {
        console.log('content messsage', contentMes)
        let tempContent = contentMes;

        if (tagUser.length > 0) {
            tags.forEach((ele) => {
                tempContent = tempContent.replace(
                    `@${ele.name}`,
                    `<span id='mtc-${ele._id}' className="tag-user" }>@${ele.name}</span>`
                );
            });
        }

        console.log('tempContent', parse(tempContent))

        return parse(tempContent);
    }




    const matchesLink = CheckLink(content);



    const renderMessageText = (contentMes) => {

        if (!matchesLink) {
            return (
                <>
                    {tags.length > 0 ? (
                        tranferTextToTagUser(contentMes, tags)
                    ) : (
                        contentMes
                    )}
                </>
            )

        } else {
            if (matchesLink.length === 1) {
                return (
                    <>
                        <div
                            className={`${replaceConentWithouLink(contentMes, matchesLink[0])}`.length > 0 ? 'content-single-link' : ''}
                        >
                            {
                                tags.length > 0 ? (
                                    tranferTextToTagUser(replaceConentWithouLink(contentMes, matchesLink[0]), tags)
                                ) : (
                                    replaceConentWithouLink(contentMes, matchesLink[0])
                                )

                            }
                        </div>
                        <LinkPreview
                            url={matchesLink[0]}
                            imageHeight="20vh"
                            className='link-preview-custom'

                        />
                    </>
                )
            }

            if (matchesLink.length > 1) {
                return (
                    <div className='content-mutiple-link'>{
                        tags.length > 0 ? (
                            tranferTextToTagUser(replaceContentToLink(contentMes, matchesLink), tags)
                        ) : (
                            parse(replaceContentToLink(contentMes, matchesLink))
                        )
                    }</div>
                )
            }
        }

    }


    return (
        <div className='text-message-item'>


            {
                renderMessageText(content)
            }



            <div className="time-and-last_view">

                <div className="time-send">
                    <span>
                        {`0${dateAt.getHours()}`.slice(
                            -2
                        )}
                        :
                        {`0${dateAt.getMinutes()}`.slice(
                            -2
                        )}
                    </span>

                </div>

                {
                    isSeen && (
                        <div className="is-seen-message">
                            Đã xem
                        </div>
                    )

                }
            </div>

            {children}




        </div>


    );
}

export default TextMessage;