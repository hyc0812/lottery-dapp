// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/**
 * LotteryPool.sol
 * -------------------------------------------------
 * Educational demo contract for a decentralized lottery.
 * Features:
 *  - Owner opens and closes rounds
 *  - Users place ETH bets
 *  - Oracle (owner in demo) sets the official result
 *  - Contract calculates the winner(s)
 *  - Winners can claim rewards
 * -------------------------------------------------
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract LotteryPool is Ownable, ReentrancyGuard, Pausable {
    constructor() {} 
    // ---------- DATA STRUCTURES ----------
    struct Bet {
        address user;     // player address
        bytes bet;        // encoded bet (e.g., lotto numbers)
        uint256 amount;   // ETH amount
    }

    struct Round {
        uint256 id;                      // round number
        bool open;                       // true = open for betting
        bool finalized;                  // true = finalized and claimable
        uint256 closeTime;               // when betting closes
        bytes result;                    // official lottery result
        uint256 totalPool;               // total ETH collected
        Bet[] bets;                      // all bets in this round
        mapping(address => uint256) claimable; // claimable prize per user
    }

    mapping(uint256 => Round) private rounds;
    uint256 public currentRoundId;

    // ---------- EVENTS ----------
    event RoundOpened(uint256 indexed roundId, uint256 closeTime);
    event BetPlaced(uint256 indexed roundId, address indexed user, uint256 amount, bytes bet);
    event RoundClosed(uint256 indexed roundId);
    event ResultFulfilled(uint256 indexed roundId, bytes result);
    event RoundFinalized(uint256 indexed roundId);
    event Claimed(uint256 indexed roundId, address indexed user, uint256 amount);

    // ---------- MODIFIERS ----------
    modifier roundExists(uint256 roundId) {
        require(rounds[roundId].id != 0, "Round does not exist");
        _;
    }

    modifier onlyOpen(uint256 roundId) {
        require(rounds[roundId].open, "Round not open");
        _;
    }

    // ---------- ADMIN FUNCTIONS ----------

    /// @notice Opens a new betting round
    function openRound(uint256 closeTime) external onlyOwner whenNotPaused {
        require(currentRoundId == 0 || rounds[currentRoundId].finalized, "Previous round not finalized");
        require(closeTime > block.timestamp, "Invalid closeTime");

        currentRoundId += 1;
        Round storage r = rounds[currentRoundId];
        r.id = currentRoundId;
        r.open = true;
        r.closeTime = closeTime;

        emit RoundOpened(currentRoundId, closeTime);
    }

    /// @notice Closes betting for a given round
    function closeRound(uint256 roundId) external onlyOwner roundExists(roundId) {
        Round storage r = rounds[roundId];
        require(r.open, "Already closed");
        r.open = false;
        emit RoundClosed(roundId);
    }

    /// @notice Oracle (or admin) sets the result
    function fulfillResult(uint256 roundId, bytes calldata result)
        external
        onlyOwner
        roundExists(roundId)
    {
        Round storage r = rounds[roundId];
        require(!r.finalized, "Already finalized");
        require(!r.open, "Round still open");

        r.result = result;
        emit ResultFulfilled(roundId, result);
    }

    /// @notice Calculates the winner(s) and sets claimable amounts
    /// @dev Demo logic: picks a random winner from all bets using keccak(result)
    function finalizeRound(uint256 roundId) external onlyOwner roundExists(roundId) nonReentrant {
        Round storage r = rounds[roundId];
        require(!r.finalized, "Already finalized");
        require(r.result.length > 0, "Result not set");

        r.finalized = true;

        // Demo only: randomly select one winner
        if (r.bets.length > 0) {
            uint256 winnerIndex = uint256(keccak256(r.result)) % r.bets.length;
            Bet storage winner = r.bets[winnerIndex];
            r.claimable[winner.user] = r.totalPool;
        }

        emit RoundFinalized(roundId);
    }

    // ---------- USER FUNCTIONS ----------

    /// @notice Place a bet (send ETH)
    function placeBet(uint256 roundId, bytes calldata betData)
        external
        payable
        whenNotPaused
        roundExists(roundId)
        onlyOpen(roundId)
    {
        Round storage r = rounds[roundId];
        require(block.timestamp < r.closeTime, "Betting closed");
        require(msg.value > 0, "Must send ETH");

        r.bets.push(Bet({user: msg.sender, bet: betData, amount: msg.value}));
        r.totalPool += msg.value;

        emit BetPlaced(roundId, msg.sender, msg.value, betData);
    }

    /// @notice Claim reward if you are a winner
    function claim(uint256 roundId) external nonReentrant roundExists(roundId) {
        Round storage r = rounds[roundId];
        require(r.finalized, "Round not finalized");
        uint256 amount = r.claimable[msg.sender];
        require(amount > 0, "Nothing to claim");

        r.claimable[msg.sender] = 0;
        (bool ok, ) = payable(msg.sender).call{value: amount}("");
        require(ok, "Transfer failed");

        emit Claimed(roundId, msg.sender, amount);
    }

    // ---------- ADMIN CONTROLS ----------
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // ---------- VIEW FUNCTIONS ----------
    function getRoundInfo(uint256 roundId)
        external
        view
        returns (bool open, bool finalized, uint256 totalPool, uint256 closeTime, bytes memory result)
    {
        Round storage r = rounds[roundId];
        return (r.open, r.finalized, r.totalPool, r.closeTime, r.result);
    }

    function getBetCount(uint256 roundId) external view returns (uint256) {
        return rounds[roundId].bets.length;
    }

    function getClaimable(uint256 roundId, address user) external view returns (uint256) {
        return rounds[roundId].claimable[user];
    }

    // Allow contract to receive ETH
    receive() external payable {}
}
