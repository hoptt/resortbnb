"use client";

import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import "./timer.css";

export function AdTimer({
  expiryTime,
  hasDigit = true,
}: {
  expiryTime: string;
  hasDigit?: boolean;
}) {
  const time = new Date(expiryTime);

  time.setSeconds(time.getSeconds());

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,

    restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {},
  });

  /* 타이머 종료 시 재시작 */
  useEffect(() => {
    if (!isRunning) restart(time);
  }, [isRunning]);

  return (
    <div>
      <div className="text-4xl">
        <div className="timer__container">
          {days !== undefined ? (
            <Digit value={days} title="일" hasDigit={hasDigit} />
          ) : null}
          {days !== undefined ? (
            <div className="timer__separtor__container">
              <div className="timer__separtor" />
              <div className="timer__separtor" />
            </div>
          ) : null}
          <Digit value={hours} title="시" hasDigit={hasDigit} />
          <div className="timer__separtor__container">
            <div className="timer__separtor" />
            <div className="timer__separtor" />
          </div>
          <Digit value={minutes} title="분" hasDigit={hasDigit} />
          <div className="timer__separtor__container">
            <div className="timer__separtor" />
            <div className="timer__separtor" />
          </div>
          <Digit value={seconds} title="초" hasDigit={hasDigit} />
        </div>
      </div>
    </div>
  );
}

const Digit = ({
  value,
  title,
  hasDigit,
}: {
  value: number;
  title: string;
  hasDigit: boolean;
}) => {
  const leftDigit = value >= 10 ? value.toString()[0] : "0";
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString();
  return (
    <div className="timer__digit__container">
      {hasDigit && <div className="timer__digit__title">{title}</div>}

      <div className="timer__digit__container__sub">
        <div className="timer__digit__single">
          <span className="mx-auto">{leftDigit}</span>
        </div>
        <div className="timer__digit__single">
          <span className="mx-auto">{rightDigit}</span>
        </div>
      </div>
    </div>
  );
};
